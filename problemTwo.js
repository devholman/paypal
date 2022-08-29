async function one() {
  console.log('painting pixels on screen');

  let fetchedData;
  fetchedData = await fetchData();
  console.log(' data fetched!' + fetchedData.success);
  console.log('painting complete');

  return 'successful!';
}

function two() {
  let response = one().then((res) => console.log('Call was a ' + res));
  return response;
}

function fetchData() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ success: 200 });
    }, 5000),
  );
}

two();
