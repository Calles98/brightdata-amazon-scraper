/**
 * Import function triggers from their respective submodules:
 *
 import {onCall} from "firebase-functions/v2/https";
 import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { adminDb } from "./firebaseAdmin";
import * as admin from "firebase-admin"

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const fetchResults = async (id: string) => {
    const api_key = process.env.BRIGHTDATA_API_KEY

    const res = await fetch(`https://api.brightdata.com/dca/dataset?id=${id}`, {
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${api_key}`
        }
    })

    const data = await res.json(); 

    if (data.status === "building" || data.status === "collecting") {
        console.log("NOT COMPLETE YET, TRYING AGAIN");
        return fetchResults(id); 
        
    }

    return data; 

}

export const  onScraperComplete =  onRequest(async (request, response) => {
    console.log("SCRAPE COMPLETE >>>", request.body);

    const { success, id } = request.body; 

    if (!success) {
        await adminDb.collection('searches').doc(id).set({
            status: "error", 
            updatedAt: admin.firestore.Timestamp.now(),

        }, {
            merge: true
        })
    }

    const data = await fetchResults(id); 

    await adminDb.collection('searches').doc(id).set({
        status: "complete", 
        updatedAt: admin.firestore.Timestamp.now(), 
        results: data, 
    }, {
        merge: true
    })


    
    logger.info("Hello logs!", {structuredData: true});
    response.send("Scraping function finished");
});
