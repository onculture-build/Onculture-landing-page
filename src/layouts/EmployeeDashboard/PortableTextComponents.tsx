import React from 'react'
import PortableImageCOmponent from './PortableImageCOmponent'



const PortableTextComponents = {
    types: {
        image: PortableImageCOmponent,
    },
    block: ({ node, children }: any) => {
        switch (node.style) {
            case 'h1':
                return <h1 style={{ fontSize: '20px', margin: '0' }}>{children}</h1>;
            case 'h2':
                return <h2 style={{ fontSize: '20px', margin: '0' }}>{children}</h2>;
            case 'blockquote':
                return <blockquote style={{ fontSize: '20px', margin: '0' }}>{children}</blockquote>;
            default:
                return <p style={{ fontSize: '20px', margin: '0' }}>{children}</p>;
        }

    },
    list: (props: any) => {
        if (props.type === 'bullet') {
            // Change the bullet to a filled circle
            return <ul style={{ listStyle: 'disc', marginBottom: '10px', color: '#5c00dd' }}>{props.children}</ul>;
        } else {
            // Change the number to a lowercase Roman numeral
            return <ol style={{
                borderLeft: '5px solid #5c00dd',
                backgroundColor: '#f1f1f1',
                listStyleType: 'none',
                padding: '10px',
                marginBottom: '10px'
            }
            }> {props.children}</ol>;
        }
    },
    listItem: (props: any) => {
        return <li style={{ fontSize: '20px', color: 'black' }}>{props.children}</li>;
    },
    file: (props:any) => {
        return (
            <a href={props.node.asset.url} download={props.node.asset.originalFilename}>
                {props.node.title}
            </a>
        );
    },
    link: (props:any) => {
        if (props.node.href.startsWith('mailto:')) {
            return (
                <a
                    style={{
                        color: '#ff00ff',
                        textDecoration: 'none',
                        borderBottom: '2px solid #ff00ff',
                    }}
                    href={props.node.href}
                >
                    {props.children}
                </a>
            );
        } else {
            return (
                <a
                    style={{
                        color: '#ff00ff',
                        textDecoration: 'none',
                        borderBottom: '2px solid #ff00ff',
                    }}
                    href={props.node.href}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {props.children}
                </a>
            );
        }
    },
    attachment: (props:any) => {
        return (
            <a
                style={{
                    display: 'inline-block',
                    marginBottom: '20px',
                    color: '#000000',
                    backgroundColor: '#ffffff',
                    borderRadius: '5px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                    padding: '10px',
                    textDecoration: 'none',
                }}
                href={props.node.asset.url}
                download={props.node.asset.originalFilename}
            >
                {props.node.title}
            </a>
        );
    },



}

export default PortableTextComponents