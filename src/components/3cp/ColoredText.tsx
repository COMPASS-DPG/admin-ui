const ColoredText = ({ text, classes }: { text: string; classes: string }) => {
  return <div className={`rounded-md px-2 py-0.5 ${classes}`}>{text}</div>;
};
export default ColoredText;
