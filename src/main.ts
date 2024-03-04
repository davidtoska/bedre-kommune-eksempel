import './style.css'

import * as B from "@media-quest/builder";
import * as E from "@media-quest/engine";

// Use the js version of the schema if you want load schema synchronously (no fetcthing needed)
import { detHandlerOmMeg } from "./det-handler-om-meg";


const app = document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;
if(!(app instanceof HTMLDivElement)) throw new Error('App not found')

const schemaContainer = document.createElement('div');


const schema = B.BuilderSchema.fromJson(detHandlerOmMeg);

const origin = window.location.origin;
console.log(origin);

const compiled = schema.compile({
    blockAutoplayQuestion: false,
    blockAutoplayVideo: false,
    mediaAssets: {
        fileNameStrategy: "id",
        audioFilesBaseUrl: origin + "/ispe-audio",
        videoFilesBaseUrl: origin + "/ispe-video",
        imageFilesBaseUrl: origin + "/ispe-image",
    },
});

const screenHeight = window.innerHeight;
// Max height will be 1300px
const schemaHeight =  screenHeight * 0.9;
const engine = new E.SchemaEngine(schemaContainer, schemaHeight, 1024, compiled.schema);

engine.onProgress((result) => {
    const currPage = compiled.schema.pages.length - result.pagesLeft
    console.group("Page " + currPage + " of " + compiled.schema.pages.length);
    console.log("Answers count: " + result.answers.length);
    console.log("Pages left: " + result.pagesLeft);
    // console.log(result.answers);
    console.groupEnd()
});
app.appendChild(schemaContainer);
console.log(B)
console.log(compiled)
// const
// console.log(app)
