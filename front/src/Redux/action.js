import data from "../data/data.json";

export const fetchDataMock = () =>
  new Promise((resolve) => setTimeout(resolve, 1000, data));

export const getData = () => async (dispatch) => {
  const data  = await fetchDataMock()
  try {
    dispatch({
      type: "FetchData",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
