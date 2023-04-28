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
              // "Client-ID 8AaOzWIzBjToHkNNYtgTYyBlnDcNr4-A_uBGakwF5BI",
              "Client-ID DALumgIQYnnoRxZocgSXbGNgchuspZ-KJYNkMkg3hsU"
          }),
        }
      );

      const payload = await response.json();
      const formattedPhotos = await Promise.all(
        payload.map(async (photo) => {
          const photoResponse = await fetch(photo.links.self, {
            method: "GET",
            headers: new Headers({
              Authorization:
                // "Client-ID 8AaOzWIzBjToHkNNYtgTYyBlnDcNr4-A_uBGakwF5BI",
              "Client-ID DALumgIQYnnoRxZocgSXbGNgchuspZ-KJYNkMkg3hsU"

            }),
          });
          const photoData = await photoResponse.json();
          const dateObj = new Date(photoData.created_at);
          const formattedDate = dateObj.toLocaleDateString("de-CH", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
            // timeZoneName: 'short'
          });
          let downloadRate = (photoData.downloads / photoData.views) * 100;
          if (photoData.downloads == 0){
            downloadRate = 0
          }
          const formattedViews = new Intl.NumberFormat('en-GB').format(photoData.views);
const formattedDownloads = new Intl.NumberFormat('en-GB').format(photoData.downloads);
return { ...photoData, created_at: formattedDate, download_rate: Math.round(downloadRate * 100) / 100, views: formattedViews, downloads: formattedDownloads };

        })
      );
      photos = photos.concat(formattedPhotos);
      console.log(photos)
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
        Authorization:
        //  "Client-ID 8AaOzWIzBjToHkNNYtgTYyBlnDcNr4-A_uBGakwF5BI",
        "Client-ID DALumgIQYnnoRxZocgSXbGNgchuspZ-KJYNkMkg3hsU"

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
            // "Client-ID 8AaOzWIzBjToHkNNYtgTYyBlnDcNr4-A_uBGakwF5BI",
            "Client-ID DALumgIQYnnoRxZocgSXbGNgchuspZ-KJYNkMkg3hsU"

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
        Authorization: 
        //"Client-ID 8AaOzWIzBjToHkNNYtgTYyBlnDcNr4-A_uBGakwF5BI",
        "Client-ID DALumgIQYnnoRxZocgSXbGNgchuspZ-KJYNkMkg3hsU"

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
        Authorization:
        //  "Client-ID 8AaOzWIzBjToHkNNYtgTYyBlnDcNr4-A_uBGakwF5BI",
        "Client-ID DALumgIQYnnoRxZocgSXbGNgchuspZ-KJYNkMkg3hsU"

      }),
    });
    const payload = await response.json();
    return payload;
  } catch (error) {
    console.log(error);
  }
  return await respons.json;
}
