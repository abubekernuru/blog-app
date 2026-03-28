import React from 'react'
import { Footer, FooterBrand, FooterCopyright, FooterDivider, FooterLink, FooterLinkGroup, FooterTitle, FooterIcon } from 'flowbite-react';
import { Link } from 'react-router-dom'
import { BsFacebook, BsTwitter, BsGithub, BsTelegram, BsGit, BsInstagram } from 'react-icons/bs';

function FooterComp() {
    return (
    <Footer container className='border border-t-8 border-teal-500  '>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                <div className='mt-5'>
                    <Link
                        to='/' className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                        <span className='px-2 py-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                            Abuki's
                        </span>
                            Blog
                    </Link>
                </div>
                <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                    <div>
                        <FooterTitle title='About' />
                        <FooterLinkGroup col>
                            <FooterLink
                                href='http://www.abubekernuru.vercel.app/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                About
                            </FooterLink>
                            <FooterLink
                                href='http://www.abubekernuru.vercel.app/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Abuki's Blog
                            </FooterLink>
                        </FooterLinkGroup>
                    </div>
                    <div>
                        <FooterTitle title='Follow Us' />
                        <FooterLinkGroup col>
                            <FooterLink
                                href='http://www.linkedin.com/in/abubekernuru/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                LinkedIn
                            </FooterLink>
                            <FooterLink
                                href='http://www.github.com/abubekernuru/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Github
                            </FooterLink>
                        </FooterLinkGroup>
                    </div>
                    <div>
                        <FooterTitle title='Legal' />
                        <FooterLinkGroup col>
                            <FooterLink
                                href='#'
                            >
                                Privacy Policy
                            </FooterLink>
                            <FooterLink
                                href='#'
                            >
                                Terms &amp; Conditions
                            </FooterLink>
                        </FooterLinkGroup>
                    </div>
                </div>
            </div>
            <FooterDivider />
                    <div className='w-full sm:flex sm:items-center sm:justify-between'>
                        <FooterCopyright href='#' by='Abubeker Nuru' year={new Date().getFullYear()} />
                        <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                            <FooterIcon href='#' icon={BsFacebook}/>
                            <FooterIcon href='#' icon={BsInstagram}/>
                            <FooterIcon href='#' icon={BsTwitter}/>
                            <FooterIcon href='https://github.com/abubekernuru' icon={BsGithub}/>
                            <FooterIcon href='#' icon={BsTelegram}/>
                        </div>
                    </div>
        </div>
    </Footer>
    )
}

export default FooterComp