import { wpcasBackendUrl } from '@root/config';
import axios from 'axios';
import { toast } from 'react-toastify';

type CompetencyItem = {
  competency: string;
  competencyLevelNumber: number;
  question: string;
};
export const downloadTemplate = async () => {
  try {
    const response = await axios.get(
      `${wpcasBackendUrl}/api/question-bank/template`
    );
    const templateData = response?.data?.data;

    const header = ['competency', 'competencyLevelNumber', 'question'];

    const csvContent =
      header.join(',') +
      '\n' +
      templateData.unmappedCompetencies
        .map((item: CompetencyItem) =>
          [item.competency, item.competencyLevelNumber, item.question].join(',')
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'question_bank_template.csv';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  } catch (error) {
    toast.error('something went wrong');
  }
};

export const uploadTemplate = async (
  file: File,
  setShowErrorPopUp: (val: boolean) => void,
  setShowSuccessPopUp: (val: boolean) => void
) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    // Make a POST request to backend
    await axios.post(`${wpcasBackendUrl}/api/question-bank/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      },
    });

    setShowSuccessPopUp(true);
  } catch (error) {
    setShowErrorPopUp(true);
  }
};
