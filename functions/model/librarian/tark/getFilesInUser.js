/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
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

const { getFileInUser } = require("../lib");

exports.getFilesInUser = function(request, response) {
  const uid = request.body.data.UID;
  const resultData = [];
  const status = 200;
 
  const promise1 = getFileInUser(uid).then((snapshot) => {
    snapshot.forEach((element) => {
      resultData.push(element.data());
    });
  });
 
  return Promise.resolve(promise1).then(() => {
    const result={data: {status: "Ok", data: resultData}};
    return response.status(status).send(result);
  })
      .catch((error) => {
        console.error(error);
        const result= {data: {status: "Error", data: undefined}};
        return response.status(status).send(result);
      });
};
 
