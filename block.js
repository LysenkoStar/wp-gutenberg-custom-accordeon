const { registerBlockType } = wp.blocks;
const { RichText, BlockControls, InspectorControls, InnerBlocks } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;
const { ToolbarGroup, ToolbarButton } = wp.components;

registerBlockType('accordion-block/main', {
    title: 'Accordion',
    icon: 'accordion',
    category: 'common',
    attributes: {
        accordionItems: {
            type: 'array',
            default: [],
        },
    },
    edit: function(props) {
        const { attributes, setAttributes } = props;
        const { accordionItems } = attributes;

        const addAccordionItem = () => {
            setAttributes({
                accordionItems: [
                    ...accordionItems,
                    { title: '', content: '', isOpen: false },
                ],
            });
        };

        const toggleAccordionItem = (index) => {
            const updatedItems = [...accordionItems];
            updatedItems[index].isOpen = !updatedItems[index].isOpen;
            setAttributes({
                accordionItems: updatedItems,
            });
        };

        const updateAccordionItem = (index, field, value) => {
            const updatedItems = [...accordionItems];
            updatedItems[index][field] = value;
            setAttributes({ accordionItems: updatedItems });
        };

        const handleKeyDown = (event, index) => {
            const item = event.target.closest('.accordion-item-editor');
            if (!item) return;

            if (event.key === 'Enter' || event.key === ' ') {
                // Toggle accordion item on Enter or Space
                toggleAccordionItem(index);
            }
        };

        return wp.element.createElement(
            'div',
            { className: 'accordion-block-editor' },
            wp.element.createElement(InspectorControls, null,
                wp.element.createElement(PanelBody, { title: 'Accordion Settings' },
                    wp.element.createElement(TextControl, {
                        label: 'Accordion Title',
                        onChange: (value) => setAttributes({ accordionTitle: value }),
                    })
                )
            ),
            wp.element.createElement('button', { onClick: addAccordionItem }, 'Add Accordion Item'),
            wp.element.createElement('div', { className: 'accordion-items' },
                accordionItems.map(function(item, index) {
                    const isOpen = item.isOpen;

                    return wp.element.createElement(
                        'div',
                        {
                            key: index,
                            className: 'accordion-item-editor',
                            tabIndex: '0',
                            'aria-expanded': isOpen ? 'true' : 'false',
                            'aria-controls': `accordion-content-${index}`,
                            onClick: () => toggleAccordionItem(index),
                            onKeyDown: (event) => handleKeyDown(event, index),
                        },
                        wp.element.createElement(TextControl, {
                            label: 'Item Title',
                            value: item.title,
                            tabIndex: '0',
                            'aria-labelledby': `accordion-header-${index}`,
                            onChange: (value) => updateAccordionItem(index, 'title', value),
                        }),
                        wp.element.createElement(RichText, {
                            tagName: 'div',
                            value: item.content,
                            tabIndex: '0',
                            placeholder: 'Item content',
                            'aria-labelledby': `accordion-header-${index}`,
                            'aria-hidden': isOpen ? 'false' : 'true',
                            onChange: (value) => updateAccordionItem(index, 'content', value),
                        }),
                        wp.element.createElement('div', {
                            id: `accordion-header-${index}`,
                            className: 'accordion-header',
                            'aria-hidden': 'true',
                        }, item.title)
                    );
                })
            )
        );
    },
    save: function() {
        return null;
    },
});

document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const title = item.querySelector('.accordion-title');
        const content = item.querySelector('.accordion-content');

        title.addEventListener('click', () => {
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
});

