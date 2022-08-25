//declaraciones
import yargs from "yargs/yargs";
const args = yargs(process.argv.slice(2)).argv;

//funciones
const getInfo = async (req, res) => {
  try {
    const platform = process.platform;
    const version = process.version;
    const memory = process.memoryUsage();
    const path = process.execPath;
    const pid = process.pid;
    const folder = process.cwd();

    const data = {
      args,
      platform,
      version,
      memory,
      path,
      pid,
      folder,
    };

    res.json(data);
  } catch (error) {
    console.log("Ocurrio un error en el getInfo: ", error);
    res.sendStatus(500);
  }
};

//export
export { getInfo };
