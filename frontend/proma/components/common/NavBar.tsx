import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "react-sliding-pane/dist/react-sliding-pane.css";
import {
  FaRegUserCircle,
  FaPencilAlt,
  FaCheck,
  FaGithub,
} from "react-icons/fa";
import Image from "next/image";
import { ThemeType } from "../../interfaces/style";
import Link from "next/link";
import Toggle from "./Toggle";

const NavBarContainer = styled.div`
  background-color: ${(props: ThemeType) => props.theme.mainColor};
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  color: white;
`;

const Logo = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

const MenuBox = styled.div`
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  background-color: inherit;
  border: none;
  font-size: 20px;
  color: white;
  margin-right: 20px;
`;

const MenuIconButton = styled(MenuButton)`
  font-size: 30px;
  margin-top: 10px;
`;

const MenuToggleBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
`;

{
  /* 로그인 모달 */
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

{
  /* 마이페이지 모달 */
}
const style2 = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  paddingTop: "80px",
  paddingBottom: "80px",
  height: "400px",
};

const ModalBox = styled(Modal)`
  .MuiBox-root {
    padding: 0px;
    border: 0px;
    border-radius: 3px;
    overflow: hidden;
    background-color: ${(props: ThemeType) => props.theme.bgColor};
  }
`;

const Header = styled.div`
  height: 50px;
  padding: 3px 20px;
  background: ${(props: ThemeType) => props.theme.mainColor};
  color: white;
  font-size: 25px;
  display: flex;
  align-items: center;
  text-decoration: underline;
`;

const Login = styled.div`
  height: 50px;
  font-size: 22px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  font-weight: bold;
  margin: 32px 32px 32px 32px;
  align-items: center;
  border-radius: 3px;
  border: 1px solid white;
  color: white;
  background-color: #3e3f42;
`;

const Profile = styled.div`
  align-self: center;
  margin: 32px 32px 0px 32px;
`;

const Profileimg = styled.div`
  text-align: -webkit-center;
`;

const Username = styled.div`
  width: 40%;
  height: 40px;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid ${(props: ThemeType) => props.theme.mainColor};
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${(props: ThemeType) => props.theme.mainColor};
  font-size: 20px;
  font-weight: 600;
`;

const NameInput = styled.input`
  border: none;
  width: 40%;
  align-self: center;
  border-radius: 3px;
  font-size: 20px;
  padding: 5px 10px;
  margin: 3% 0% 0% 0%;
  outline: 1px solid ${(props: ThemeType) => props.theme.subPurpleColor};
  &:focus {
    outline: 1px solid ${(props: ThemeType) => props.theme.mainColor};
  }
`;

const NavBar = ({
  toggleDarkMode,
  darkMode,
}: {
  toggleDarkMode: any;
  darkMode: boolean;
}) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [joinStatus, setJoinStatus] = useState<boolean>(false);
  const showLoginModal = () => setLoginStatus((cur) => !cur);
  const showJoinModal = () => setJoinStatus((cur) => !cur);

  const [userName, setUserName] = useState<string>("");
  const [image, setImage] = useState("");

  const [modify, setModify] = useState<boolean>(false);

  const onChangeName = (e: any) => {
    setUserName(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      setUserName(e.target.value);
      setModify(true);
    }
  };

  return (
    <>
      <NavBarContainer>
        <Link href="/">
          <Logo>
            <Image src="/logo.png" width={130} height={55} />
          </Logo>
        </Link>

        <MenuBox>
          {userName == "" ? (
            <MenuToggleBox>
              <MenuButton onClick={showLoginModal}>Login</MenuButton>
              <MenuButton onClick={showJoinModal}>Join</MenuButton>
            </MenuToggleBox>
          ) : (
            <MenuToggleBox>
              <MenuIconButton onClick={showJoinModal}>
                <FaRegUserCircle />
              </MenuIconButton>
              <MenuButton onClick={() => location.reload()}>Logout</MenuButton>
            </MenuToggleBox>
          )}

          <Toggle changeMode={toggleDarkMode} />
        </MenuBox>

        {/* 로그인 모달 */}
        <ModalBox
          open={loginStatus}
          onClose={showLoginModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Header>Login</Header>
            <Login
              onClick={() => {
                setUserName("박주한");
                setImage(
                  "https://cdn.pixabay.com/photo/2021/10/24/21/34/profile-pic-6739366_960_720.png"
                );
                showLoginModal();
              }}
            >
              <FaGithub style={{ marginRight: "2%" }} />
              Github
            </Login>
          </Box>
        </ModalBox>

        {/* 마이페이지 모달 */}
        <ModalBox
          open={joinStatus}
          onClose={showJoinModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <Header>Profile</Header>
            {modify === false ? (
              <FaPencilAlt
                style={{
                  marginLeft: "auto",
                  height: "6%",
                  width: "6%",
                  padding: "4% 4% 0% 0%",
                }}
                onClick={() => {
                  setModify(true);
                }}
              />
            ) : (
              <FaCheck
                style={{
                  marginLeft: "auto",
                  height: "6%",
                  width: "6%",
                  padding: "4% 4% 0% 0%",
                }}
                onClick={() => {
                  setModify(false);
                }}
              />
            )}

            <Profile>
              <Profileimg>
                {image == "" ? (
                  <img
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                    }}
                    src="/profileimg.png"
                  />
                ) : (
                  <img
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                    }}
                    onClick={showJoinModal}
                    src={image}
                  />
                )}
              </Profileimg>
            </Profile>
            {modify === false ? null : (
              <form style={{ textAlignLast: "center" }}>
                <input type="file" id="profile-upload" accept="image/*" />
              </form>
            )}
            {modify === false ? (
              <Username>{userName}</Username>
            ) : (
              <NameInput
                value={userName}
                onKeyPress={handleKeyPress}
                onChange={onChangeName}
              />
            )}
          </Box>
        </ModalBox>
      </NavBarContainer>
    </>
  );
};

export default NavBar;
