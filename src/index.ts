import * as mc from "@minecraft/server";

export class Scoreboard<T extends string> {
    public scoreboard: mc.Scoreboard;
    private readonly unzero: boolean;

    constructor(unzero: boolean) {
        this.unzero = unzero;
        this.scoreboard = mc.world.scoreboard;
    }

    private zero(value: number) {
        return this.unzero ? Math.min(0, value) : value;
    }

    public get(name: T, player: mc.Player) {
        const objective = this.scoreboard.getObjective(name);
        if (!objective)
            throw new Error(`Objective ${name} does not exist.`);

        return objective.getScore(player);
    }

    public set(name: T, player: mc.Player, value: number) {
        const objective = this.scoreboard.getObjective(name);
        if (!objective)
            throw new Error(`Objective ${name} does not exist.`);

        objective.setScore(player, this.zero(value));
        return this;
    }

    public add(name: T, player: mc.Player, value: number) {
        this.set(name, player, this.zero(this.get(name, player) + value));
        return this;
    }

    public reset(name: T, player: mc.Player) {
        this.set(name, player, 0);
        return this;
    }

    public delete(name: T, player: mc.Player, value: number) {
        const score = Math.max(0, this.get(name, player) - value);
        this.set(name, player, this.unzero ? score : value);
        return this;
    }
}