/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

const {updateNote, getNote} = require("../lib");
const {getUser} = require("../../users/lib");

exports.editNote = function(request, response) {
  const uid = request.body.data.Uid;
  const title = request.body.data.Title;
  const note = request.body.data.Note;
  const lastUpdatedDate = request.body.data.LastUpdatedDate;
  const lastUpdatedTime = request.body.data.LastUpdatedTime;
  const docId = request.body.data.DocId;

  let result;
  let status = 200;

  const promise = getUser(uid, "").then((doc) => {
    const p1 = getNote(uid, docId).then((noteData) => {
      if (noteData == undefined) {
        result = {data: {status: "Note doesn't exist"}};
      } else {
        const inputJson = {
          Title: title,
          Note: note,
          LastUpdatedDate: lastUpdatedDate,
          LastUpdatedTime: lastUpdatedTime,
        };
        updateNote(inputJson, uid, docId);
      }
    }).catch((error) => {
      status = 500;
      console.log("Error:", error);
    });

    return Promise.resolve(p1);
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Note edited Successfully");
    return response.status(status).send(result);
  })
      .catch((error) => {
        result = {data: error};
        console.error("Error Deleting", error);
        return response.status(status).send(result);
      });
};
