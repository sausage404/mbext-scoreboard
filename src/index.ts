import * as mc from "@minecraft/server";

export class Scoreboard<T extends string> {
    public objective: mc.Scoreboard;
    private readonly unzero: boolean;

    constructor(unzero: boolean) {
        this.unzero = unzero;
        this.objective = mc.world.scoreboard;
    }

    private zero(value: number) {
        return this.unzero ? Math.min(0, value) : value;
    }

    public async get(name: T, player: mc.Player) {

        if (!this.objective.getObjective(name))
            throw new Error(`Objective ${name} does not exist.`);

        return this.objective.getObjective(name).getScore(player);
    }

    public async set(name: T, player: mc.Player, value: number) {
        this.set(name, player, this.zero(value));
        return this;
    }

    public async add(name: T, player: mc.Player, value: number) {
        this.set(name, player, this.zero(await this.get(name, player) + value));
        return this;
    }

    public async reset(name: T, player: mc.Player) {
        this.set(name, player, 0);
        return this;
    }

    public async delete(name: T, player: mc.Player, value: number) {
        const score = Math.max(0, await this.get(name, player) - value);
        this.set(name, player, this.unzero ? score : value);
        return this;
    }
}