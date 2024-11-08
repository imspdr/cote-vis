import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { Divider, Paper, Typography } from "@mui/material";
import { css } from "@emotion/react";
import { unselectable } from "@src/util";
import ThemeToggle from "./common/ThemeToggle";
import HomePage from "./common/HomePage";

type CodingTest = {
  name: string;
  url: string;
  desc: string;
};

export const codingTests: CodingTest[] = [
  {
    url: "magicforest",
    name: "마법의 숲 탐색",
    desc: "삼성 SW 역량테스트 2024 상반기 오후 1번 문제",
  },
];

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const url = window.location.href.split("/");
  const label = codingTests.find((val) => val.url === url[url.length - 1]);

  const toggleTheme = () => {
    const styles = getComputedStyle(document.body);

    //light
    const black = styles.getPropertyValue("--black");
    const white = styles.getPropertyValue("--white");
    const light = styles.getPropertyValue("--light");
    const mint = styles.getPropertyValue("--mint");
    const scrollColorBlack = styles.getPropertyValue("--scroll-color-black");

    //dark
    const darkBlack = styles.getPropertyValue("--dark-black");
    const darkWhite = styles.getPropertyValue("--dark-white");
    const darkMint = styles.getPropertyValue("--dark-mint");
    const scrollColorWhite = styles.getPropertyValue("--scroll-color-white");

    const docEl = document.documentElement;
    if (darkMode) {
      docEl.style.setProperty("--background", light);
      docEl.style.setProperty("--foreground", black);
      docEl.style.setProperty("--scroll-color", scrollColorBlack);
      docEl.style.setProperty("--highlight", mint);
      docEl.style.setProperty("--paper", white);
    } else {
      docEl.style.setProperty("--background", darkBlack);
      docEl.style.setProperty("--foreground", darkWhite);
      docEl.style.setProperty("--scroll-color", scrollColorWhite);
      docEl.style.setProperty("--highlight", darkMint);
      docEl.style.setProperty("--paper", black);
    }
    setDarkMode((v) => !v);
  };
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            height: 48px;
            padding: 0px 10px;
            ${unselectable}
          `}
        >
          <Typography onClick={() => navigate("/")}>
            {!!!label ? "IMSPDR" : `IMSPDR / ${label.name}`}
          </Typography>
          <ThemeToggle onClick={toggleTheme} isDark={darkMode} />
        </div>
        <Divider />
        <div
          css={css`
            position: absolute;
            top: 48px;
          `}
        >
          <Suspense fallback={<div>{"loading"}</div>}>
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/magicforest" element={<div>drt</div>} />

              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </Suspense>
        </div>
      </>
    </ThemeProvider>
  );
}
