export const createDirConfig = (
    astDir: string, 
    waranDir: string, 
    srcDir: string) => {

    const config = {
        ast_dir: astDir,
        wrn_proj_dir: waranDir,
        src_dir: srcDir
    };

    return config;
}

export const createInfo = (answers: Answers) => {
    const info = {
        proj_name: answers.name,
        desc: answers.desc,
        repo: answers.repo,
        author: answers.author
    };

    return info;
}

export const createProjectConfig = (info: Info, dirs: Dirs) => {
    const basicConfig =  {
        project_info: info,
        config: {
            dirs: dirs
        },
        waran: 'https://github.com/kamkow1/waran',
        authors: 'kamkow1 && londek'
    };

    return basicConfig;
}

interface Answers {
    name: string;
    desc: string;
    repo: string;
    author: string;
}

interface Dirs {
    ast_dir: string,
    wrn_proj_dir: string,
    src_dir: string
}

interface Info {
    proj_name: string,
    desc: string,
    repo: string,
    author: string
}