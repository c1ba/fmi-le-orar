import { writable } from 'svelte/store';

const getFilesMetadata = async () => {
    const availableOptions: {val: string; label: string;}[] = [];
    const JSONModules = import.meta.glob("../../static/data/*.json");
    for (const modulePath in JSONModules) {
      let fileName = modulePath.substring(modulePath.lastIndexOf("/")+1);
      await JSONModules[modulePath]().then((res: any) => {
        availableOptions.push({val: fileName.replace(".json", "").toUpperCase(), label: res.metaData.name});
      });
    }
    return availableOptions;
};

export const optionsStore = writable(await getFilesMetadata());
