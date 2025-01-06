/**
 * @fileoverview
 * Type definitions for @mbext/scoreboard
 * See https://github.com/iduckphone/mbext-scoreboard for more details.
 *
 * @license GNU General Public License v3
 *
 * @author [sausage404] <parinya24dev@gmail.com>
 *
 * This file contains type definitions for the @mbext/scoreboard JavaScript library.
 * It provides TypeScript types for the library's public API.
 * 
 * To use these types, include this file in your TypeScript project and ensure
 * your TypeScript compiler is configured to recognize `.d.ts` files.
 */

/**
 * Manages Minecraft scoreboard operations with type safety
 * @template T - The type of objective names, must be a string
 */
export class Scoreboard<T extends string> {
    /** The Minecraft scoreboard instance */
    public objective: import("@minecraft/server").Scoreboard;
    
    /** Whether to prevent scores from going below zero */
    private readonly unzero: boolean;

    /**
     * Creates a new Scoreboard instance
     * @param unzero - If true, prevents scores from going below zero
     */
    constructor(unzero: boolean);

    /**
     * Applies the unzero constraint to a value if enabled
     * @param value - The number to process
     * @returns The processed number, minimum 0 if unzero is true
     */
    private zero(value: number): number;

    /**
     * Gets a player's score for an objective
     * @param name - The objective name
     * @param player - The target player
     * @returns The player's score
     * @throws Error if the objective doesn't exist
     */
    public get(name: T, player: import("@minecraft/server").Player): number;

    /**
     * Sets a player's score for an objective
     * @param name - The objective name
     * @param player - The target player
     * @param value - The score to set
     * @returns This instance for chaining
     */
    public set(name: T, player: import("@minecraft/server").Player, value: number): this;

    /**
     * Adds to a player's score for an objective
     * @param name - The objective name
     * @param player - The target player
     * @param value - The amount to add
     * @returns This instance for chaining
     */
    public add(name: T, player: import("@minecraft/server").Player, value: number): this;

    /**
     * Resets a player's score to zero
     * @param name - The objective name
     * @param player - The target player
     * @returns This instance for chaining
     */
    public reset(name: T, player: import("@minecraft/server").Player): this;

    /**
     * Subtracts from a player's score with minimum value constraint
     * @param name - The objective name
     * @param player - The target player
     * @param value - The amount to subtract
     * @returns This instance for chaining
     */
    public delete(name: T, player: import("@minecraft/server").Player, value: number): this;
}