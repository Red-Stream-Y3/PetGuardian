import ThemeChipList from './ThemeChipList';

const ThemeWeekDaySelector = ({ days, setDays }) => {
  const handleChipClick = (index) => {
    const newDays = [...days];
    newDays[index] = !newDays[index];
    setDays(newDays);
  };

  const daysOfTheWeek = [
    {
      text: 'Monday',
      onClick: () => {
        handleChipClick(0);
      }
    },
    {
      text: 'Tuesday',
      onClick: () => {
        handleChipClick(1);
      }
    },
    {
      text: 'Wednesday',
      onClick: () => {
        handleChipClick(2);
      }
    },
    {
      text: 'Thursday',
      onClick: () => {
        handleChipClick(3);
      }
    },
    {
      text: 'Friday',
      onClick: () => {
        handleChipClick(4);
      }
    },
    {
      text: 'Saturday',
      onClick: () => {
        handleChipClick(5);
      }
    },
    {
      text: 'Sunday',
      onClick: () => {
        handleChipClick(6);
      }
    }
  ];

  return (
    <ThemeChipList multiSelect={true} data={daysOfTheWeek} activeList={days} />
  );
};

export default ThemeWeekDaySelector;
