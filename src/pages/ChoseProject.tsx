import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import firebase from "firebase/app";
import { db } from "../../firebaseClient";
import { createNewProject } from "../utils/reducers";
import CreateProjectComponent from "./new-project";
import router from "next/router";

interface Props {
  userId: string;
}
interface Project {
  projectId: string;
  willMoveAddress: string;
  willMoveDate: Date | null;
}

export default function ChoseProjectComponent(props: Props) {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const [projects, setProjects] = useState<Project[]>([
    {
      projectId: "",
      willMoveAddress: "",
      willMoveDate: null,
    },
  ]);

  const submitProjectId = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createNewProject(value));
    router.push("/dashboard");
  };

  useEffect(() => {
    if (props.userId) {
      console.log("props.userId", props.userId);
      db.collection("users")
        .doc(props.userId)
        .collection("projects")
        .orderBy("created_at", "desc")
        .onSnapshot((snapshot) => {
          setProjects(
            snapshot.docs.map((doc) => ({
              projectId: doc.id,
              willMoveAddress: doc.data().willMoveAddress,
              willMoveDate: doc.data().willMoveDate,
            }))
          );
        });
    } else {
      router.push("/sign-in");
    }
  }, [props.userId]);

  return (
    <>
      {projects[0] ? (
        <form onSubmit={submitProjectId}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              プロジェクトを選択してください
            </FormLabel>
            <RadioGroup
              aria-label="projects"
              name="project1"
              value={value}
              onChange={handleChange}
            >
              {projects.map((project) => (
                <span key={project.projectId}>
                  <FormControlLabel
                    value={project.projectId}
                    control={<Radio />}
                    label={project.projectId}
                  />
                </span>
              ))}
            </RadioGroup>
          </FormControl>
          <button type="submit">送信</button>
        </form>
      ) : (
        <CreateProjectComponent />
      )}
    </>
  );
}
