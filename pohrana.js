import { readFile, writeFile } from "fs/promises";

const DATOTEKA = "zadaci.json";

export async function ucitaj() {
    let sadrzaj;

    try {
        sadrzaj = await readFile(DATOTEKA, "utf8");
    } catch (pogreska) {
        if (pogreska.code === "ENOENT") {
            return [];
        }
        throw new Error(`Datoteku ${DATOTEKA} nije moguće pročitati.`);
    }

    try {
        const podatci = JSON.parse(sadrzaj);
        if (!Array.isArray(podatci)) {
            throw new Error();
        }
        return podatci;
    } catch {
        throw new Error(`Datoteka ${DATOTEKA} sadrži neispravan JSON.`);
    }
}

export async function spremi(zadatci) {
    try {
        await writeFile(DATOTEKA, JSON.stringify(zadatci, null, 2), "utf8");
    } catch (pogreska) {
        throw new Error(`Zapis u datoteku ${DATOTEKA} nije moguć.`);
    }
}