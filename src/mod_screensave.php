<?php
/**
 * @Author		Marko Zabreznik
 * @copyright	Marko Zabreznik
 * @license		http://www.gnu.org/licenses/gpl-3.0.html GNU/GPL
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

// no direct access
defined('_JEXEC') or die('Restricted access');

// Include the syndicate functions only once
require_once dirname(__FILE__).'/helper.php';

$folder	= modScreenSaveHelper::getFolder($params);
$images	= modScreenSaveHelper::getImages($params, $folder);

if (!count($images)) {
	echo JText::_('MOD_RANDOM_IMAGE_NO_IMAGES');
	return;
}

$settings = array(
	'folder' =>	JURI::base().str_replace('\\', '/', $folder),
	'urls' => $images,
	'wait' => $params->get('wait', 120),
	'delay' => $params->get('delay', 20),
	'position' => $params->get('position', 'fill'),
	'animation' => $params->get('animation', 'no')
);

JHtml::_('jquery.framework');

$document = JFactory::getDocument();
$document->addScript("modules/mod_screensave/tmpl/js/jquery.screensave.js");

require JModuleHelper::getLayoutPath('mod_screensave');
