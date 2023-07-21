import { type } from 'os'
import React, { HTMLAttributes } from 'react'
import { LuAlertCircle } from 'react-icons/lu'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { PiWarningBold } from 'react-icons/pi'
import { MdErrorOutline } from 'react-icons/md'
import { Transition } from '@headlessui/react'

interface IProps extends HTMLAttributes<HTMLElement> {
    type: string
    title: string
    show: boolean
}

const Alert = (props: IProps) => {
    return (
        <Transition
            show={props.show}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className={`alert alert-${props.type} my-2`} {...props}>
                {props.type == 'info' && <LuAlertCircle />}
                {props.type == 'success' && <AiOutlineCheckCircle />}
                {props.type == 'warning' && <PiWarningBold />}
                {props.type == 'error' && <MdErrorOutline />}
                <span>{props.title}</span>
            </div>
        </Transition>
    )
}

export default Alert
