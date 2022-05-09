/* eslint-disable */
import Issue from "./Issue";
import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ThemeType } from "../../interfaces/style";
import IssueCreateModal from "../Modals/IssueCreateModal";
import { getIssueList, isNotUpdated } from "../../store/modules/issue";
import { connect } from "react-redux";
import { RootState } from "../../store/modules";
import { useRouter } from "next/router";

//styled-components
const TeamBox = styled.div`
  border-radius: 3px;
  background-color: ${(props: ThemeType) => props.theme.bgColor};
  padding: 0px 15px 10px 15px;
  display: flex;
  flex-direction: column;
`;
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 10px 0;
`;
const TeamName = styled.a`
  color: white;
  margin: 5px 0;
  &:hover {
    cursor: pointer;
    color: black;
  }
`;
const Title = styled.span`
  color: ${(props: ThemeType) => props.theme.textColor};
  font-weight: 400;
  font-size: 22px;
`;
const AddButton = styled.button`
  background-color: inherit;
  text-decoration: underline;
  border: none;
  font-size: 13px;
  align-self: end;
  color: ${(props: ThemeType) => props.theme.textColor};
  &:hover {
    cursor: pointer;
  }
`;

const mapStateToProps = (state: RootState) => {
  return {
    onlyMyIssue: state.modeReducer.onlyMyIssue,
    isUpdated: state.issueReducer.isUpdated,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getIssueList: (params: any) => dispatch(getIssueList(params)),
    isNotUpdated: () => dispatch(isNotUpdated()),
  };
};

const Team = ({
  team,
  sprintNo,
  getIssueList,
  onlyMyIssue,
  isUpdated,
  isNotUpdated,
}: {
  team: any;
  sprintNo: any;
  onlyMyIssue: boolean;
  getIssueList?: any;
  isUpdated?: boolean;
  isNotUpdated?: any;
}) => {
  const router = useRouter();
  //DOM 준비되었을 때 렌더링
  const [isReady, setIsReady] = useState<boolean>(false);
  const [issueCreateModal, setIssueCreateModal] = useState<boolean>(false);
  const showIssueCreateModal = () => setIssueCreateModal((cur) => !cur);
  const [issueList, setIssueList] = useState<any>([]);
  const [projectNo, setProjectNo] = useState<string>("");

  const getIssues = () => {
    let params = {};
    if (sprintNo === null) {
      params = {
        teamNo: team.teamNo,
        onlyMyIssue,
      };
    } else {
      params = {
        teamNo: team.teamNo,
        sprintNo,
        onlyMyIssue,
      };
    }

    getIssueList(params).then((res: any) => {
      const issues = res.payload.issueList;
      setIssueList(issues);
      isNotUpdated();
    });
  };

  useEffect(() => {
    if (!router.isReady) return;
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const projectCode = router.query.projectCode as string;
    setProjectNo(projectCode);
  }, [router.asPath]);

  useEffect(() => {
    if (sprintNo === undefined) return;
    getIssues();
  }, [sprintNo, onlyMyIssue]);

  useEffect(() => {
    if (isUpdated) getIssues();
  }, [isUpdated]);

  return (
    <>
      {isReady ? (
        <Droppable droppableId={`${sprintNo}_${team.teamNo}`}>
          {(provided) => (
            <TeamBox ref={provided.innerRef} {...provided.droppableProps}>
              <TopBar>
                <Link href={`/project/${projectNo}/team/${team.teamNo}`}>
                  <TeamName>
                    <Title>{team.title}</Title>
                  </TeamName>
                </Link>
                {team.isMember ? (
                  <AddButton onClick={showIssueCreateModal}>
                    + Add Issue
                  </AddButton>
                ) : null}
                <IssueCreateModal
                  issueCreateModal={issueCreateModal}
                  showIssueCreateModal={showIssueCreateModal}
                  getIssues={getIssues}
                  teamNo={team.teamNo}
                  sprintNo={sprintNo}
                />
              </TopBar>
              {issueList && issueList.length > 0 ? (
                issueList.map((issue: any, index: number) => (
                  <Issue
                    issue={issue}
                    key={index}
                    droppableId={`${sprintNo}_${team.teamNo}`}
                  />
                ))
              ) : (
                <p>No issues yet.</p>
              )}
              {provided.placeholder}
            </TeamBox>
          )}
        </Droppable>
      ) : null}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);
