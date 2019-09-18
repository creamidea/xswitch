import { ViewController, observable } from '@recore/fx';
import { Checkbox } from 'antd';
import { getOptions, setOptions } from '../../chrome-storage';
import { Enabled } from '../../enums';
import './options.less';

export default class Options extends ViewController {
  static components = { Checkbox };

  @observable
  clearCacheEnabled = false;

  @observable
  corsEnabled = false;

  setOptionStorage() {
    setOptions({
      clearCacheEnabled: this.clearCacheEnabled,
      corsEnabled: this.corsEnabled,
    });
  }

  async $init() {
    this.clearCacheEnabled = (await getOptions()).clearCacheEnabled !== Enabled.NO;
    this.corsEnabled = (await getOptions()).corsEnabled !== Enabled.NO;
  }

  setClearCacheEnabled() {
    this.clearCacheEnabled = !this.clearCacheEnabled;
    this.setOptionStorage();
  }

  setCorsEnabled() {
    this.corsEnabled = !this.corsEnabled;
    this.setOptionStorage();
  }
}
