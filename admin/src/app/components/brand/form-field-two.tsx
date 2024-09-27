import dayjs from "dayjs";
import ErrorMsg from "../common/error-msg";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export default function FormFieldTwo({
  name,
  title,
  isReq,
  default_val,
  register,
  errors,
  type = "text",
}: {
  name: string;
  title: string;
  isReq: boolean;
  default_val?: string | number;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  type?: string;
}) {
  const format_date =
    type === "date" && default_val
      ? dayjs(default_val).format("YYYY-MM-DD")
      : default_val;
  return (
    <div className="mb-5">
      <p className="mb-0 text-base text-black">{title}</p>
      <input
        {...register(`${name.toLowerCase()}`, {
          required: isReq ? `${title} là bắt buộc!` : false,
        })}
        className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
        type={type}
        name={name}
        placeholder={title}
        defaultValue={type === "date" ? format_date : default_val}
      />
      {isReq && <ErrorMsg msg={(errors?.[name]?.message as string) || ""} />}
    </div>
  );
}
