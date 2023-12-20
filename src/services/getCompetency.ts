import { wpcasBackendUrl } from '@root/config';
import axios from 'axios';
import { toast } from 'react-toastify';

import { FinalObjType } from '@/app/propTypes';

type LevelType = {
  competencyLevelName: string;
  competencyLevelNumber: number;
};

type QuestionType = {
  id: number;
  competencyId: number;
  competencyLevelNumber: number;
  question: string;
};

export const getCompetency = async () => {
  try {
    const response = await axios.get(
      `${wpcasBackendUrl}/api/admin-competency/names`
    );

    const mappedData = response?.data?.data?.map(
      ({ name, competencyId }: { name: string; competencyId: number }) => ({
        label: name,
        value: competencyId,
      })
    );
    return mappedData;
  } catch (error) {
    toast.error('something went wrong');
  }
};
export const getAllLevels = async (
  currentCompetencyId: number,
  setLoading: (val: boolean) => void
) => {
  try {
    const questionsResponse = await axios.get(
      `${wpcasBackendUrl}/api/question-bank?competencyId=${currentCompetencyId}`
    );
    const levelsResponse = await axios.get(
      `${wpcasBackendUrl}/api/admin-competency/${currentCompetencyId}`
    );

    const questions = questionsResponse?.data?.data;
    const levels = levelsResponse?.data?.data?.competencyLevels;

    // console.log('types', questions, levels);

    const combinedData = levels?.map((level: LevelType) => {
      const matchingQuestion = questions.find(
        (question: QuestionType) =>
          question.competencyLevelNumber === level.competencyLevelNumber
      );

      if (matchingQuestion) {
        return {
          competencyLevelNumber: level.competencyLevelNumber,
          competencyLevelName: level.competencyLevelName,
          question: matchingQuestion.question,
          questionId: matchingQuestion.id,
          questionPresent: true,
        };
      }

      return null; // Return null if there is no matching question
    });

    const levelsWithoutQuestion = levels
      ?.filter((level: LevelType) => {
        const hasMatchingQuestion = questions.some(
          (question: QuestionType) =>
            question.competencyLevelNumber === level.competencyLevelNumber
        );
        return !hasMatchingQuestion;
      })
      .map(
        ({
          competencyLevelName,
          competencyLevelNumber,
        }: {
          competencyLevelName: string;
          competencyLevelNumber: number;
        }) => ({
          label: competencyLevelName,
          value: competencyLevelNumber,
        })
      );
    setLoading(false);
    return {
      levelsWithQuestion: combinedData.filter(Boolean),
      levelsWithoutQuestion,
    };
  } catch (error) {
    setLoading(false);
    toast.error('something went wrong');
  }
};

export const updateItemOnServer = async (
  finalObj: FinalObjType,
  setShowSavePopUp: (value: boolean) => void
) => {
  try {
    if (
      finalObj.createQuestions.length ||
      finalObj.updateQuestions.length ||
      finalObj.deleteQuestions.length
    ) {
      // Only include deleteQuestions if it's not empty
      if (finalObj.deleteQuestions?.length === 0) {
        await axios.post(
          `${wpcasBackendUrl}/api/question-bank/updateMultipleQuestions`,
          {
            createQuestions: finalObj.createQuestions,
            updateQuestions: finalObj.updateQuestions,
          }
        );
      } else {
        await axios.post(
          `${wpcasBackendUrl}/api/question-bank/updateMultipleQuestions`,
          finalObj
        );
      }
      setShowSavePopUp(true);
    } else {
      toast.error('No change found in Competency level and Question');
    }
    // Handle the response or perform additional tasks as needed
  } catch (error) {
    toast.error('something went wrong');
    // Handle the error appropriately
  }
};
