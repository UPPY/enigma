import * as React from 'react';
import './GenericFooter.css';
/**
 * The interface for external links to be used in the footer
 */
export interface ILink {
    /**
     * The absolute or relative path to the linked page
     */
    uri: string

    /**
     * The text representing the path
     */
    labelText: string;
}

export interface IGenericFooterProps {
    /**
     * Whether a copy right is needed
     */
    hasCopyRight: boolean;

    /**
     * All the external links for the page
     */
    links?: Array<ILink>;

}

/**
 * The generic footer to be use by all react applications
 */
export const GenericFooter: React.FC<IGenericFooterProps> = (props: IGenericFooterProps) => {

    const COPYRIGHT = `© Developed by UPENDER PARAVASTU`;
    const {links, hasCopyRight} = props;
    return <div className = 'footer-root'>
        <nav>
            <React.Fragment>
                {
                    links && links.map( (link) => {
                    return (<a href = {link.uri}> {link.labelText} </a>);
                    })
                }
            </React.Fragment>
            <React.Fragment>
                {
                    <div>{ (hasCopyRight) ? COPYRIGHT : ""}</div>
                }
            </React.Fragment>
        </nav>
    </div>
};