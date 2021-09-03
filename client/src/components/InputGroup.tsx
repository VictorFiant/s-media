import classNames from "classnames";

interface InputGroupProps {
  className?: string
  type: string
  placeholder: string
  value: string
  error: string | undefined
  setValue: (str: string) => void;
  
}

const InputGroup: React.FC<InputGroupProps> = ({
  className,
  type,
  placeholder,
  value,
  error,
  setValue,
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        className={classNames(
          "w-full px-3 py-3 transition duration-300 bg-gray-100 border border-gray-200 rounded outline-none focus:bg-white hover:border-green-400 ",
          { "border-red-500": error }
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <small className="font-medium text-red-800">{error}</small>
    </div>
  );
};

export default InputGroup;
