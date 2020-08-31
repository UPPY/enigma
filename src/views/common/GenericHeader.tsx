import * as React from 'react';
import './GenericHeader.css';
/**
 * The interface for external links to be used in the footer
 */
export interface IMenuItem {
    /**
     * The text representing the path
     */
    labelText: string;

    /**
     * Click handler for the menu item
     */
    onClick: () => {};
}

/**
 * The interface for header properties
 */
export interface IGenericHeaderProps {
    /**
     * The title for the application
     */
    title: string;

    /**
     * Optional sub title for the app
     */
    subtitle?: string;

    logoIcon?: URL;

    /**
     * All the external links for the page
     */
    menuItems?: Array<IMenuItem>;

}

/**
 * The generic footer to be use by all react applications
 */
export const GenericHeader: React.FC<IGenericHeaderProps> = (props: IGenericHeaderProps) => {
    const {title, subtitle, menuItems} = props;
    return <div className = 'header-root'>
            <h1>{title}</h1>
            {
                (!!subtitle) ? <h3>{subtitle}</h3> : ''
            }
    </div>
};