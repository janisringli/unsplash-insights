export async function getPhotos(username) {
  try {
    const userProfileResponse = await fetch(
      `https://api.unsplash.com/users/${username}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization:
            "Client-ID 8AaOzWIzBjToHkNNYtgTYyBlnDcNr4-A_uBGakwF5BI",
        }),
      }
    );
    const userProfile = await userProfileResponse.json();
    const totalPhotos = userProfile.total_photos;
    const perPage = 30;
    const totalPages = Math.ceil(totalPhotos / perPage);
    let photos = [];

    for (let page = 1; page <= totalPages; page++) {
      const response = await fetch(
        `https://api.unsplash.com/users/${username}/photos/?per_page=${perPage}&page=${page}`,
        {
          method: "GET",
          headers: new Headers({
            Authorization:
              "Client-ID 8AaOzWIzBjToHkNNYtgTYyBlnDcNr4-A_uBGakwF5BI",
          }),
        }
      );

      const payload = await response.json();
      photos = photos.concat(payload);
    }

    return photos;
  } catch (error) {
    console.log(error);
  }
}

export async function getSinglePhotos(photoId) {
  try {
    console.log(photoId);
    const response = await fetch(`https://api.unsplash.com/photos/${photoId}`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Client-ID 8AaOzWIzBjToHkNNYtgTYyBlnDcNr4-A_uBGakwF5BI",
      }),
    });
    const payload = await response.json();
    console.log(payload);
    return payload;
  } catch (error) {
    console.log(error);
  }
  return await response.json;
}

export async function getStats(username) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/users/${username}/`,
      {
        method: "GET",
        headers: new Headers({
          Authorization:
            "Client-ID 8AaOzWIzBjToHkNNYtgTYyBlnDcNr4-A_uBGakwF5BI",
        }),
      }
    );
    const payload = await response.json();
    return payload;
  } catch (error) {
    console.log(error);
  }

  return await response.json;
}

export async function getMonthlyStats() {
  try {
    const response = await fetch(`https://api.unsplash.com/stats/monthly`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Client-ID 8AaOzWIzBjToHkNNYtgTYyBlnDcNr4-A_uBGakwF5BI",
      }),
    });
    const payload = await response.json();
    return payload;
  } catch (error) {
    console.log(error);
  }
  return await respons.json;
}
export async function getTotalStats() {
  try {
    const response = await fetch(`https://api.unsplash.com/stats/total`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Client-ID 8AaOzWIzBjToHkNNYtgTYyBlnDcNr4-A_uBGakwF5BI",
      }),
    });
    const payload = await response.json();
    return payload;
  } catch (error) {
    console.log(error);
  }
  return await respons.json;
}
