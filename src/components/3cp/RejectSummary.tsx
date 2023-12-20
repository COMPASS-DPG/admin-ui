import { outfit } from '@/components/FontFamily';

const RejectSummary = ({ summary }: { summary?: string | undefined }) => {
  return (
    <div
      className={`flex rounded-lg border border-[#D4D4D4] bg-[#FFEFEF] p-2 text-[14px] ${outfit.className} `}
    >
      <div className='whitespace-nowrap pr-2  font-semibold capitalize text-[#272728]'>
        Rejection Reason:
      </div>

      <div className='text-[##787878]'>{summary ? summary : '==='}</div>
    </div>
  );
};
export default RejectSummary;
