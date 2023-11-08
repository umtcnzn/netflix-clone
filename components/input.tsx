import { useState } from "react"
import { BsEyeSlash, BsEye } from "react-icons/bs"


type InputProps = {
    id: string
    onChange: any
    value: string
    label: string
    type?: string
}



export default function Input(props: InputProps) {
    const [type, setType] = useState("password");

    function setTypefor() {
        if (type == "password")
            setType("text")
        else
            setType("password")
    }

    const Icon = type == "password" ? BsEyeSlash : BsEye;
    return (
        <>
            <div className="relative">
                <input id={props.id} onChange={props.onChange} type={props.type == "password" ? type : props.type} value={props.value} className="
            block
            rounded-md
            px-6
            pt-6
            pb-1
            w-full
            text-md
            text-white
            bg-neutral-700
            appearance-none
            focus:outline-none
            focus:ring-0
            peer
            "
                    placeholder=""
                ></input>
                <label htmlFor={props.id}
                    className="absolute text-md text-zinc-400
                duration-150
                transform
                -translate-y-3
                scale-75
                top-4
                z-10
                origin-[0]
                left-6
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-3
                       ">{props.label}</label>
                {props.type == "password" && (<div className="absolute cursor-pointer top-4 left-72 hover:opacity-50 transition" onClick={() => setTypefor()}>
                    <Icon size={20} color={"white"} />
                </div>
                )}
            </div>

        </>
    )
}