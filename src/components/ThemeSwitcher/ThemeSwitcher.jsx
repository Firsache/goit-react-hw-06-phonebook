import { BsSun, BsMoon } from 'react-icons/bs';
import { Switcher } from './ThemeSwitcher.styled';

export function ThemeSwitcher({ switchTheme, themeTitle }) {
  return (
    <Switcher type="button" onClick={switchTheme}>
      {themeTitle === 'light' ? <BsSun size={30} /> : <BsMoon size={30} />}
    </Switcher>
  );
}
