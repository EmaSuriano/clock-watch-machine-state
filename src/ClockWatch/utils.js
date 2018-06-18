const addZero = number => (number < 10 ? '0' + number : number);

export const formatTime = time => {
  const sec_num = parseInt(time, 10);
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor((sec_num - hours * 3600) / 60);
  const seconds = sec_num - hours * 3600 - minutes * 60;

  return addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds);
};

export const noop = d => d;
