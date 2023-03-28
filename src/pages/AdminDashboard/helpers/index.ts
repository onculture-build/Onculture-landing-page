// export const formatFullDate = () => {
//   const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sept",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];
//   let objectDate = new Date();

//   let day = objectDate.getDate();

//   let monthNumber = objectDate.getMonth();
//   let month = months[monthNumber];

//   let year = objectDate.getFullYear();

//   return `${day} ${month}, ${year}`;
// };

// export const ISOdateFormatter = (time: any) => {
//   const formattedDate = new Date().toDateString();
//   const formattedTime = time.toTimeString();

//   //   console.log(formattedDate + formattedTime);
//   const finalDate = new Date(formattedDate + " " + formattedTime).toISOString();
//   //   console.log(finalDate);

//   return finalDate;
// };

export const formatTime = (date: Date | string) => {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));
};

export const formatDayNDate = (date: Date | string) => {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

export const formatFullDate = () => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());
};

export const getInitials = (name: string) => {
  const arr = name.split(" ");
  let newArr = arr
    .map((x) => x.charAt(0).toUpperCase())
    .splice(0, 2)
    .join("");
  return newArr;
};

export const formatFilterDate = (date: Date | string) => {
  let objectDate = new Date(date);

  let day = objectDate.getDate();

  let month = objectDate.getMonth();

  let year = objectDate.getFullYear().toString().substring(2);

  return `${year}-${month + 1}-${day}`;
};

export const getTimeFromString = (date: string) => {
  var hour = Number(date.split(":")[0]);
  var minute = Number(date.split(":")[1]);
  const currentDate = new Date();

  currentDate.setHours(hour);
  currentDate.setMinutes(minute);

  return currentDate;
};
