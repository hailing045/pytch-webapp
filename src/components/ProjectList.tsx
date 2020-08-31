import React, { useEffect } from "react"
import { Link, RouteComponentProps } from "@reach/router"
import { IProjectSummary, LoadingState } from "../model/projects";
import { useStoreState, useStoreActions } from "../store"
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import NavBanner from "./NavBanner";

interface ProjectProps {
    project: IProjectSummary;
}

const Project: React.FC<ProjectProps> = ({ project }) => {
    const summary = project.summary ?? "(This project has no summary)";
    const linkTarget = `/ide/${project.id}`;
    return (
        <li>
            <Link to={linkTarget}><Alert className="ProjectCard" variant="success">
            <p><span className="project-name">{project.name}</span>
            <span className="project-summary">{summary}</span>
            </p></Alert></Link>
        </li>
    );
}

const ProjectsLoadingIdle: React.FC = () => {
    return (
        <div>Loading shortly...</div>
    )
};

const ProjectsLoadingPending: React.FC = () => {
    return (
        <div>Loading...</div>
    )
};

const ProjectsLoadingFailed: React.FC = () => {
    return (
        <div>Project loading FAILED oh no.</div>
    )
};

const ProjectList: React.FC = () => {
    const available = useStoreState(state => state.projectCollection.available);
    const showModal = useStoreActions(actions => actions.modals.show);

    const showCreateModal = () => { showModal("create-project"); };

    return (
        <>
            <ul>
                {available.map((p) => <Project key={p.id} project={p}/>)}
            </ul>
            <div className="buttons"><Button onClick={showCreateModal}>Create a new project</Button></div>
        </>
    )
};

const componentFromState = (state: LoadingState): React.FC => {
    switch (state) {
        case LoadingState.Idle:
            return ProjectsLoadingIdle;
        case LoadingState.Pending:
            return ProjectsLoadingPending;
        case LoadingState.Succeeded:
            return ProjectList;
        case LoadingState.Failed:
            return ProjectsLoadingFailed;
    }
};

const MaybeProjectList: React.FC<RouteComponentProps> = (props) => {
    const loadSummaries = useStoreActions(actions => actions.projectCollection.loadSummaries);
    const loadingState = useStoreState(state => state.projectCollection.loadingState);

    useEffect(() => {
        if (loadingState === LoadingState.Idle) {
            loadSummaries();
        }
    });

    const InnerComponent = componentFromState(loadingState);
    return (
        <>
        <NavBanner/>
        <div className="ProjectList">
        <h1>My projects</h1>
        <InnerComponent/>
        </div>
        </>
    );
};

export default MaybeProjectList;
