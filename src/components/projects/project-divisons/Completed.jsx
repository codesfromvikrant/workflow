import React, { useEffect } from "react";
import CompleteIcon from "../../../assets/icons/completed.png";
import { BiSolidAddToQueue } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCompleted } from "../../../features/projectsSlice";
import Menu from "../../Menu";
import Dropdown from "../../Dropdown";
import CompletedDrop from "../dropdowns/CompletedDrop";
import { getProjectsData } from "../../../utils/firestoreUtils";
import { viewProject } from "../../../utils/navigateUtils";

const Completed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const completedProjects = useSelector((state) => state.projects.completed);
  const filterCompleted = useSelector(
    (state) => state.projects.filter_completed
  );
  const getCompletedProjects = async () => {
    const projectData = await getProjectsData(uid);
    dispatch(setCompleted(projectData.completed));
  };

  useEffect(() => {
    if (!uid) return;
    getCompletedProjects();
  }, [uid]);

  const showOngoingDropdown = (id) => {
    document.getElementById(id).classList.toggle("hidden");
  };

  const projectList = filterCompleted?.map((project) => {
    const updatedAt = new Date(project.updatedAt);
    const completedAt = new Date(project.completedAt);
    const updatedDate = updatedAt.toLocaleDateString();
    const updatedTime = updatedAt.toLocaleTimeString();
    const completedDate = completedAt.toLocaleDateString();
    const completedTime = completedAt.toLocaleTimeString();

    const MAX_DESCRIPTION_LENGTH = 150;
    const description =
      project.description.length > MAX_DESCRIPTION_LENGTH
        ? `${project.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
        : project.description;

    return (
      <div
        key={project.id}
        className="w-full p-3 bg-secondary rounded-md text-sm text-gray-200 relative flex-col flex justify-start items-start"
      >
        <div
          onClick={() => showOngoingDropdown(`drop-${project.id}`)}
          className=""
        >
          <Menu />
        </div>

        <Dropdown id={project.id}>
          <CompletedDrop projectID={project.id} />
        </Dropdown>
        <p
          onClick={() => viewProject(navigate, project.id, project.status)}
          className="font-medium tracking-wide text-base capitalize hover:text-blue-700 hover:font-bold cursor-pointer transition-all duration-300"
        >
          {project.title}
        </p>

        <span className="font-light my-2 text-slate-400">
          {description}{" "}
          <span
            onClick={() => viewProject(navigate, project.id, project.status)}
            className="font-medium text-blue-700 cursor-pointer"
          >
            (Read More)
          </span>
        </span>
        <span className="bg-bgblack texxt-xs font-medium tracking-wider mt-3 py-1 px-4 rounded text-green-500">
          <span>Completed At : </span>
          <span>{completedDate} </span>
          <span>{completedTime}</span>
        </span>
        <span className="text-xs font-light text-slate-400 mt-1">
          <span className="tracking-wider">Last Updated On : </span>{" "}
          {updatedDate} {updatedTime}
        </span>
        <button
          onClick={() => viewProject(navigate, project.id, project.status)}
          className="flex justify-center items-center w-full gap-2 bg-primary mt-2 py-3 px-4 rounded"
        >
          <BiSolidAddToQueue className="text-lg" />
          <p className="tracking-wider text-slate-400 text-sm font-medium">
            Open Project
          </p>
        </button>
      </div>
    );
  });

  return (
    <div className="">
      <span className="text-gray-300 mb-2 font-semibold flex justify-between items-center">
        <span className="flex justify-start items-center gap-2">
          <img src={CompleteIcon} className="w-6" />
          <span className="">Completed</span>
          <span className="tracking-wider text-slate-400 font-light text-sm">
            (Projects Done)
          </span>
        </span>
      </span>
      <div className="h-[40rem] projects overflow-y-auto overflow-x-hidden">
        <div className="grid grid-cols-1 gap-4">
          {projectList?.length ? (
            projectList.reverse()
          ) : (
            <span className="text-textcolor"># No Project Available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Completed;
