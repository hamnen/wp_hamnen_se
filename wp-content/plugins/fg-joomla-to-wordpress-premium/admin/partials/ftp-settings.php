				<tr>
					<th scope="row" colspan="2"><h3><?php _e('Joomla FTP parameters', 'fg-joomla-to-wordpress'); ?></h3></th>
				</tr>
				<tr>
					<th scope="row"><label for="ftp_host"><?php _e('FTP host', 'fg-joomla-to-wordpress'); ?></label></th>
					<td><input id="ftp_host" name="ftp_host" type="text" size="50" value="<?php echo $data['ftp_host']; ?>" /></td>
				</tr>
				<tr>
					<th scope="row"><label for="ftp_port"><?php _e('FTP port', 'fg-joomla-to-wordpress'); ?></label></th>
					<td><input id="ftp_port" name="ftp_port" type="text" size="50" value="<?php echo $data['ftp_port']; ?>" /></td>
				</tr>
				<tr>
					<th scope="row"><label for="ftp_login"><?php _e('FTP login', 'fg-joomla-to-wordpress'); ?></label></th>
					<td><input id="ftp_login" name="ftp_login" type="text" size="50" value="<?php echo $data['ftp_login']; ?>" /></td>
				</tr>
				<tr>
					<th scope="row"><label for="ftp_password"><?php _e('FTP password', 'fg-joomla-to-wordpress'); ?></label></th>
					<td><input id="ftp_password" name="ftp_password" type="password" size="50" value="<?php echo $data['ftp_password']; ?>" /></td>
				</tr>
				<tr>
					<th scope="row"><?php _e('Protocol', 'fg-joomla-to-wordpress'); ?></th>
					<td>
						<input id="ftp_connection_type_ftp" name="ftp_connection_type" type="radio" value="ftp" <?php checked($data['ftp_connection_type'], 'ftp'); ?> /> <label for="ftp_connection_type_ftp" ><?php _e('FTP', 'fg-joomla-to-wordpress'); ?></label>&nbsp;
						<input id="ftp_connection_type_ftps" name="ftp_connection_type" type="radio" value="ftps" <?php checked($data['ftp_connection_type'], 'ftps'); ?> /> <label for="ftp_connection_type_ftps" ><?php _e('FTPS', 'fg-joomla-to-wordpress'); ?></label>&nbsp;
						<input id="ftp_connection_type_sftp" name="ftp_connection_type" type="radio" value="sftp" <?php checked($data['ftp_connection_type'], 'sftp'); ?> /> <label for="ftp_connection_type_sftp" ><?php _e('SFTP', 'fg-joomla-to-wordpress'); ?></label> <small><?php printf(__('(SFTP requires the <a href="%s" target="_blank">WP Filesystem SSH2</a> plugin)', 'fg-joomla-to-wordpress'), 'https://www.fredericgilles.net/wp-filesystem-ssh2/'); ?></small>
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="ftp_dir"><?php _e('FTP base directory', 'fg-joomla-to-wordpress'); ?></label></th>
					<td><input id="ftp_dir" name="ftp_dir" type="text" size="50" value="<?php echo $data['ftp_dir']; ?>" /></td>
				</tr>
				<tr>
					<th scope="row">&nbsp;</th>
					<td><?php submit_button( __('Test the FTP connection', 'fg-joomla-to-wordpress'), 'secondary', 'test_ftp' ); ?>
					<span id="ftp_test_message" class="action_message"></span></td>
				</tr>
