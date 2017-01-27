#add jsonlab functions to path
addpath("./jsonlab");
#just to make sure clear the workspace
clear all
#exec users code
source('./OCTAVE/user-code.m');
#TODO: Check with tim if theres an easier way to ref workspace,
#save workspace to file
save("./OCTAVE/wkspc.mat");
#load workspace file to var
S = load("./OCTAVE/wkspc.mat");
#save "workspace" as json value in file
j = savejson('', S, './OCTAVE/jsondata');
