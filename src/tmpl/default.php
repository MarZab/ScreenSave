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
?>
<script language="JavaScript">
	var screensaver;
	window.addEvent('domready', function(){
		screensaver = new ScreenSave({
			images: JSON.decode('<?php echo json_encode($images); ?>'),
			wait: <?php echo $wait; ?>,
			delay: <?php echo $delay; ?>,
			opacity: <?php echo $opacity/100; ?>,
		});
	});
</script>