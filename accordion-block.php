<?php
/**
 * Plugin Name: Accordion Block
 * Description: Custom Gutenberg block for creating an accordion with unlimited items.
 * Version: 1.0.0
 * Author: Bogdan L.
 * License: GPL-2.0-or-later
 */

defined( 'ABSPATH' ) || exit;


// Register block assets
function accordion_block_assets(): void
{
    wp_enqueue_script(
        'accordion-block-js',
        plugin_dir_url( __FILE__ ) . 'block.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ),
        true
    );

    wp_enqueue_style(
        'accordion-block-style',
        plugin_dir_url( __FILE__ ) . 'style.css',
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    );

    wp_enqueue_style(
        'accordion-block-editor-style',
        plugin_dir_url( __FILE__ ) . 'editor.css',
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
    );
}
add_action( 'enqueue_block_assets', 'accordion_block_assets' );

// Register block
function accordion_block_register(): void
{
    // Register main block
    register_block_type( 'accordion-block/main', array(
        'editor_script' => 'accordion-block-js',
        'editor_style'  => 'accordion-block-editor-style',
        'render_callback' => 'accordion_block_render',
        'attributes' => array(
            'accordionItems' => array(
                'type' => 'array',
                'default' => array(),
            ),
        ),
    ) );

    // Register child block (Accordion Item)
    register_block_type( 'accordion-block/accordion-item', array(
        'editor_script' => 'accordion-block-js',
        'editor_style'  => 'accordion-block-editor-style',
        'render_callback' => 'accordion_item_render',
        'attributes' => array(
            'title' => array(
                'type' => 'string',
                'default' => '',
            ),
            'content' => array(
                'type' => 'string',
                'default' => '',
            ),
        ),
    ) );
}
add_action( 'init', 'accordion_block_register' );

// Render callback for main block
function accordion_block_render( $attributes ): string
{
    $accordionItems = $attributes['accordionItems'] ?? [];

    $output = '<div class="accordion">';
    foreach ( $accordionItems as $item ) {
        $output .= '<div class="accordion-item">';
        $output .= '<button class="accordion-title">' . esc_html( $item['title'] ) . '</button>';
        $output .= '<div class="accordion-content">' . wp_kses_post( $item['content'] ) . '</div>';
        $output .= '</div>';
    }
    $output .= '</div>';
    return $output;
}

// Render callback for child blocks
function accordion_item_render( $attributes ): string
{
    return '<div class="accordion-item">
                <button class="accordion-title">' . esc_html( $attributes['title'] ) . '</button>
                <div class="accordion-content">' . wp_kses_post( $attributes['content'] ) . '</div>
            </div>';
}
