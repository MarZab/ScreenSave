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

$folder	= modScreensaveHelper::getFolder($params);
$images	= modScreensaveHelper::getImages($params, $folder);

if (!count($images)) {
	echo JText::_('MOD_RANDOM_IMAGE_NO_IMAGES');
	return;
}

$opacity = $params->get('opacity', 100);
$delay = $params->get('delay', 5);
$wait = $params->get('wait', 5);

if ( !is_numeric($opacity) || $opacity<0 || $opacity > 100 )
	$opacity = 100;

if ( !is_numeric($delay) || $delay<0 )
	$delay = 0;

if ( !is_numeric($wait) || $wait<0 )
	$wait = 100; 

JHTML::script("rot.js", "modules/mod_screensave/js/screensave.js", false);
require JModuleHelper::getLayoutPath('mod_screensave');
