import { world, system } from "@minecraft/server";

// This runs every time someone sends a message
world.beforeEvents.chatSend.subscribe((event) => {
    const player = event.sender;
    const msg = event.message.toLowerCase();

    // Check if it's a command
    if (msg.startsWith("!")) {
        event.cancel = true; // Hides the "!command" from chat

        // We use system.run to make sure the game has time to process the command
        system.run(() => {
            if (msg === "!heal") {
                player.getComponent("health").resetToMaxValue();
                player.sendMessage("§a[Essentials] You've been healed!");
            }

            if (msg === "!feed") {
                player.getComponent("hunger").value = 20;
                player.sendMessage("§6[Essentials] Hunger restored!");
            }

            if (msg === "!gmc") {
                player.runCommandAsync("gamemode c");
                player.sendMessage("§b[Essentials] Creative Mode Active.");
            }

            if (msg === "!gms") {
                player.runCommandAsync("gamemode s");
                player.sendMessage("§e[Essentials] Survival Mode Active.");
            }
        });
    }
});
