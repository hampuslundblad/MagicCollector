import "./Spinner.css";
type SpinnerProps = {
  className: string;
};
const Spinner = ({ className }: SpinnerProps) => {
  console.log(className);
  return (
    <div className={"lds-ring " + className}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
