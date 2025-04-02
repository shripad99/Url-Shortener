import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />
      {isShowPassword ? (
        <FaRegEye size={22} className="cursor-pointer text-gray-500" onClick={toggleShowPassword} />
      ) : (
        <FaRegEyeSlash size={22} className="text-slate-400 cursor-pointer" onClick={toggleShowPassword} />
      )}
    </div>
  );
};

export default PasswordInput;
