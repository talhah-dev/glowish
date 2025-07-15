import { Avatar } from '@nextui-org/react'
import { Dot, Heart, Send } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Comments = ({post}) => {
    return (
        <div className="">
            <div className="border-b">
                <div className="flex items-center p-3">
                    <div className="">
                        <Avatar src={"/assets/images/user-2.png"} className="me-2" size="sm" />
                    </div>
                    <Link
                        href={"#"}
                        className="font-matter sm:text-base !text-sm font-medium text-gray-900 hover:text-gray-800"
                    >
                        Author
                    </Link>
                </div>
            </div>
            <div className="bg-gray-50 h-[66.5vh] overflow-auto h-full">
                <div className="flex p-3 items-start">
                    <div className="">
                        <Avatar src={"/assets/images/user-2.png"} className="me-2" size="sm" />
                    </div>
                    <div className="">
                        <div className="justify-between flex items-center">
                            <div className="flex items-center">
                                <Link
                                    href={"/"}
                                    className="font-matter sm:text-base !text-sm font-medium text-gray-900 hover:text-gray-800"
                                >
                                    @user
                                </Link>
                                <Dot />
                                <p className="text-xs text-default-500">
                                    12h
                                </p>
                            </div>
                            <Heart fill="#ff3040" size={13} className="text-[#ff3040]  cursor-pointer" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. At porro omnis odio maxime. Ea eaque odit explicabo qui veniam a dolor, deserunt provident atque fugit eveniet, pariatur, sunt officia consequuntur?</p>
                        <div className="flex items-center">
                            <p className="text-xs text-default-500">
                                9 likes
                            </p>
                            <Dot className="text-zinc-600" />
                            <p className="text-xs text-default-500">
                                Reply
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex pl-14 p-3 items-start">
                    <div className="">
                        <Avatar src={"/assets/images/user-2.png"} className="me-2" size="sm" />
                    </div>
                    <div className="">
                        <div className="justify-between flex items-center">
                            <div className="flex items-center">
                                <Link
                                    href={"/"}
                                    className="font-matter sm:text-base !text-sm font-medium text-gray-900 hover:text-gray-800"
                                >
                                    @user
                                </Link>
                                <Dot />
                                <p className="text-xs text-default-500">
                                    12h
                                </p>
                            </div>
                            <Heart size={13} className="text-zinc-600  cursor-pointer" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. At porro omnis odio maxime. Ea eaque odit </p>
                        <div className="flex items-center">
                            <p className="text-xs text-default-500">
                                2 likes
                            </p>
                            <Dot className="text-zinc-600" />
                            <p className="text-xs text-default-500">
                                Reply
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <form className="w-full border-t flex items-center pr-3">
                <input type="text" className="w-full p-3 outline-none placeholder:text-zinc-400 placeholder:text-sm" placeholder="Add a comment..." />
                <button type="submit">
                    <Send className="text-zinc-500 cursor-pointer" size={20} />
                </button>
            </form>
        </div>
    )
}

export default Comments