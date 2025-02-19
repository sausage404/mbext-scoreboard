import * as mc from "@minecraft/server";

export class Scoreboard<T extends string> {
    public scoreboard: mc.Scoreboard;
    private readonly unzero: boolean;
    private readonly autoObjective: boolean;

    constructor(unzero: boolean = false, autoObjective: boolean = false) {
        this.scoreboard = mc.world.scoreboard;
        this.unzero = unzero;
        this.autoObjective = autoObjective;
    }


    public get(name: T, player: mc.Player) {
        const objective = this.scoreboard.getObjective(name);
        if (!objective) {
            if (this.autoObjective)
                this.scoreboard.addObjective(name);
            else
                throw new Error(`Objective ${name} does not exist`);
        }

        let score: number;
        try {
            score = objective.getScore(player);
        } catch {
            score = 0;
        }

        return score
    }

    public set(name: T, player: mc.Player, value: number) {
        const objective = this.scoreboard.getObjective(name);
        if (!objective) {
            if (this.autoObjective)
                this.scoreboard.addObjective(name);
            else
                throw new Error(`Objective ${name} does not exist`);
        }

        objective.setScore(player, value);
        return this;
    }

    public add(name: T, player: mc.Player, value: number) {
        this.set(name, player, this.get(name, player) + value);
        return this;
    }

    public reset(name: T, player: mc.Player) {
        this.set(name, player, 0);
        return this;
    }

    public delete(name: T, player: mc.Player, value: number) {
        const score = Math.min(0, this.get(name, player) - value);
        this.set(name, player, this.unzero ? score : value);
        return this;
    }
}