import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import RegisterPassword from "../lv2/RegisterPassword";
import { RegisterData, LoginData } from "../../types/_index";
import { FormErrorMessage as error } from "../../styles/tailwindcss/constant";

type Props = {
    setIs_authenticated: (param: boolean) => void;
    getUser: () => Promise<void>;
};

const RegisterContent: React.VFC<Props> = ({
    setIs_authenticated,
    getUser,
}: Props) => {
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterData>();

    const history = useHistory();

    const onSubmit = async (registerData: RegisterData): Promise<void> => {
        // console.log({ registerData });
        if (watch().password === watch().password_confirmation) {
            await axios
                .post("/register", registerData)
                .then((res) => {
                    if (res.data.result === true) {
                        login({
                            email: registerData.email,
                            password: registerData.password,
                        });
                    }
                })
                .catch((err) => {
                    const emailErrRes = err.response.data.errors.email[0];
                    if (emailErrRes === "validation.unique") {
                        setErrorMessage(
                            "このメールアドレスは既に使用されています"
                        );
                    }
                });
        } else {
            setErrorMessage("確認のパスワードが一致しません");
        }
    };

    const login = async (loginData: LoginData): Promise<void> => {
        // console.log({loginData});
        await axios
            .post("/login", loginData)
            .then((res) => {
                history.push("/");
                getUser();
                setIs_authenticated(true);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 sm:flex sm:flex-col sm:justify-center sm:py-12">
            <div className="pt-22 sm:pt-20 xs:p-0 mx-auto w-11/12 sm:w-full max-w-xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white shadow w-full rounded-xl divide-y divide-gray-200 px-4 sm:px-12 md:px-16 py-3 sm:py-9 md:py-12"
                >
                    <h2 className="block font-bold text-center text-xl sm:text-3xl pb-2 ">
                        新規登録
                    </h2>
                    <main className="py-2 sm:py-7">
                        <h2 className="font-semibold text-sm text-gray-600 pb-1 block">
                            名前
                        </h2>
                        <input
                            {...register("name", {
                                required: true,
                                maxLength: 255,
                            })}
                            type="text"
                            placeholder="Full Name"
                            className="border rounded-lg border-grey-light px-3 py-2 mt-1 w-full  block"
                        />
                        <div className="text-gray-300 text-xs pt-1">
                            ✔︎ 1文字以上255字以下
                        </div>
                        {errors.name && errors.name.type === "required" && (
                            <p className={error}>名前は必須です</p>
                        )}
                        {errors.name && errors.name.type === "maxLength" && (
                            <p className={error}>
                                名前は255文字以下にしてください
                            </p>
                        )}
                        <h2 className="font-semibold text-sm text-gray-600 pt-1 sm:pt-3 pb-1 block">
                            メールアドレス
                        </h2>
                        <input
                            {...register("email", {
                                required: true,
                                maxLength: 255,
                                pattern: /^\S+@\S+$/i,
                            })}
                            type="text"
                            placeholder="Email"
                            className="border rounded-lg border-grey-light px-3 py-2 w-full block "
                        />
                        {errors.email && errors.email.type === "required" && (
                            <p className={error}>メールアドレスは必須です</p>
                        )}
                        {errors.email && errors.email.type === "maxLength" && (
                            <p className={error}>
                                メールアドレスは255文字以下にしてください
                            </p>
                        )}
                        {errors.email && errors.email.type === "pattern" && (
                            <p className={error}>
                                メールアドレスの形式が不正です
                            </p>
                        )}
                        <div className="w-full">
                            <h2 className="font-semibold text-sm text-gray-600 pt-1 sm:pt-3 pb-1 block">
                                パスワード
                            </h2>
                            <RegisterPassword
                                register={register}
                                category={"password"}
                            />
                            <div className="text-gray-300 text-xs pt-1">
                                ✔︎ 8文字以上
                            </div>
                            {errors.password &&
                                errors.password.type === "required" && (
                                    <p className={error}>
                                        パスワードは必須です
                                    </p>
                                )}
                            {errors.password &&
                                errors.password.type === "minLength" && (
                                    <p className={error}>
                                        パスワードは8文字以上にしてください
                                    </p>
                                )}
                        </div>
                        <div className="w-full">
                            <h2 className="font-semibold text-sm text-gray-600 pt-1 sm:pt-3 pb-1 block">
                                確認パスワード
                            </h2>
                            <RegisterPassword
                                register={register}
                                category={"password_confirmation"}
                            />
                            {errors.password_confirmation &&
                                errors.password_confirmation.type ===
                                    "required" && (
                                    <p className={error}>
                                        確認のパスワードは必須です
                                    </p>
                                )}
                            {errors.password_confirmation &&
                                errors.password_confirmation.type ===
                                    "minLength" && (
                                    <p className={error}>
                                        パスワードは8文字以上にしてください
                                    </p>
                                )}
                            <p className="pt-1 text-red-400 text-xs opacity-90">
                                {errorMessage}
                            </p>
                        </div>
                        <input
                            type="submit"
                            value="新規登録"
                            className="mt-3 sm:mt-5 transition duration-200 bg-blue-400 hover:bg-blue-300 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block cursor-pointer"
                        />
                    </main>
                    <div className="pt-1 sm:pt-4"></div>
                </form>
                <aside className="text-center text-grey-dark py-3 sm:py-5">
                    すでにアカウントをお持ちですか？
                    <Link to="/login">
                        <span className="py-3 whitespace-nowrap">
                            <span className="no-underline border-b border-blue text-blue">
                                ログイン
                            </span>
                        </span>
                    </Link>
                </aside>
                <aside className="w-full text-center sm:text-right">
                    <Link
                        to="/"
                        className="w-10 transition duration-200 mx-5 p-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-4 h-4 inline-block align-text-top"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        戻る
                    </Link>
                </aside>
            </div>
        </div>
    );
};

export default RegisterContent;
