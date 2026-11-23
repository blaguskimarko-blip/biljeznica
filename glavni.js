import { ucitaj, spremi } from "./pohrana.js";

function greska(poruka) {
    console.error(poruka);
    process.exit(1);
}

async function main() {
    const [naredba, ...argumenti] = process.argv.slice(2);

    try {
        const zadatci = await ucitaj();

        switch (naredba) {
            case "dodaj": {
                const naslov = argumenti.join(" ").trim();
                if (!naslov) {
                    greska("Naslov zadatka je obavezan.");
                }

                const id = zadatci.reduce((maxId, zadatak) => Math.max(maxId, zadatak.id), 0) + 1;
                zadatci.push({ id, naslov, gotovo: false });
                await spremi(zadatci);
                console.log(`Zadatak dodan: ${naslov}`);
                break;
            }
            case "popis": {
                if (zadatci.length === 0) {
                    console.log("Nema zadataka.");
                }

                for (const z of zadatci) {
                    console.log(`${z.id}. [${z.gotovo ? "x" : " "}] ${z.naslov}`);
                }
                break;
            }
            case "gotovo": {
                const id = Number(argumenti[0]);
                if (!Number.isInteger(id)) {
                    greska("ID zadatka mora biti cijeli broj.");
                }

                const zadatak = zadatci.find(z => z.id === id);
                if (!zadatak) {
                    greska(`Zadatak s ID-om ${id} ne postoji.`);
                }

                zadatak.gotovo = true;
                await spremi(zadatci);
                console.log(`Zadatak s ID-om ${id} označen kao gotovo.`);
                break;
            }
            default:
                greska("Nepoznata naredba.");
        }
    } catch (pogreskaIzvodenja) {
        greska(pogreskaIzvodenja.message);
    }
}

main();