import { Blockchain } from "wb-blockchain";
import SETTINGS from "./settings";

async function getLastBlock(): Promise<string | number> {
    throw "Not implemented"
}

async function start() {
    let blockchain = new Blockchain(SETTINGS.blockchainUrl);
    let syncedUntil = await getLastBlock();
    let syncUpdates = await blockchain.resync(syncedUntil);
    syncedUntil = syncUpdates.syncedToBlock;
}
