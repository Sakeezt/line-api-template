import { FlexConfig } from './flex/flex.config';
import { QuickreplyConfig } from './quickreply/quickreply.config';
import { RitchMenuConfig } from './ritchmenu/ritchmenu.config';
import { TextConfig } from './text/text.config';

export class MessageType {
  static textConfig = new TextConfig();
  static flexConfig = new FlexConfig();
  static quickreplyConfig = new QuickreplyConfig();
  static ritchmenu = new RitchMenuConfig();
}
