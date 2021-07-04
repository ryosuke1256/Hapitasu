import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { RegisterData } from "../../type/api/RegisterData";

type Props = {
    register: UseFormRegister<RegisterData>;
    category: "name" | "email" | "password" | "password_confirmation";
};

const RegisterPassword: React.VFC<Props> = ({ register, category }: Props) => {
    const [isRevealPassword, setIsRevealPassword] = useState(false);
    const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false); //prettier-ignore

    const togglePassword = () => {
        if (category === "password") {
            setIsRevealPassword((prevState) => !prevState);
        } else if (category === "password_confirmation") {
            setIsRevealConfirmPassword((prevState) => !prevState);
        } else {
            return null;
        }
    };

    const IsRevealPassword = (): boolean | undefined => {
        if (category === "password") {
            return isRevealPassword;
        } else if (category === "password_confirmation") {
            return isRevealConfirmPassword;
        } else {
            return;
        }
    };

    return (
        <>
            <input
                type={IsRevealPassword() ? "text" : "password"}
                autoComplete="off"
                placeholder="Password"
                className="border rounded-lg px-3 py-2 mt-1 z-50 text-sm w-11/12"
                {...register(category, {
                    required: true,
                    minLength: 8,
                })}
            />
            <span onClick={togglePassword}>
                {IsRevealPassword() ? (
                    <i className="far fa-eye pl-2 text-gray-600" />
                ) : (
                    <i className="far fa-eye-slash pl-2 text-gray-600" />
                )}
            </span>
        </>
    );
};

export default RegisterPassword;